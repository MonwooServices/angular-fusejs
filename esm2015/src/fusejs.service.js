import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import { set as _set } from 'lodash-es';
import { get as _get } from 'lodash-es';
export class FusejsService {
    constructor() {
        this.defaultOptions = {
            supportHighlight: true,
            shouldSort: false,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            includeScore: true,
            minSearchTermLength: 3,
            fusejsHighlightKey: 'fuseJsHighlighted',
            fusejsScoreKey: 'fuseJsScore',
        };
    }
    searchList(list, searchTerms, options = {}) {
        // https://stackoverflow.com/questions/35959372/property-assign-does-not-exist-on-type-objectconstructor
        // TODO : remove (<any>Object) hack by using right lib or polyfill ?
        const fuseOptions = Object.assign({}, this.defaultOptions, options);
        let result = [];
        if (searchTerms && searchTerms.length >= ((fuseOptions === null || fuseOptions === void 0 ? void 0 : fuseOptions.minSearchTermLength) || 0)) {
            if (fuseOptions.supportHighlight) {
                fuseOptions.includeMatches = true;
            }
            let fuse = new Fuse(list, fuseOptions);
            result = fuse.search(searchTerms);
            if (fuseOptions.supportHighlight) {
                result = this.handleHighlight(result, fuseOptions);
            }
        }
        else {
            result = this.deepClone(list);
            if (fuseOptions.supportHighlight) {
                result.forEach((element) => {
                    element[fuseOptions.fusejsHighlightKey || '_'] = this.deepClone(element);
                });
            }
        }
        return result;
    }
    deepClone(o) {
        var _out, v, _key;
        _out = Array.isArray(o) ? [] : {};
        for (_key in o) {
            v = o[_key];
            _out[_key] = (typeof v === "object") ? this.deepClone(v) : v;
        }
        return _out;
    }
    handleHighlight(result, options) {
        if (options.maximumScore && options.includeScore) {
            result = result.filter((matchObject) => {
                return matchObject.score <= (options.maximumScore || 0);
            });
        }
        return result.map((matchObject) => {
            var _a, _b;
            const item = this.deepClone(matchObject.item);
            item[options.fusejsHighlightKey || "_"] = this.deepClone(item);
            item[options.fusejsScoreKey || "_"] = matchObject.score;
            for (let match of matchObject.matches) {
                const indices = match.indices;
                let highlightOffset = 0;
                let key = match.key;
                if (_get(item[options.fusejsHighlightKey || "_"], key).constructor === Array) {
                    key += `[${match.arrayIndex}]`;
                }
                for (let indice of indices) {
                    let initialValue = _get(item[options.fusejsHighlightKey || "_"], key);
                    const startOffset = indice[0] + highlightOffset;
                    const endOffset = indice[1] + highlightOffset + 1;
                    const tagStart = "<" + ((_a = options.highlightTag) !== null && _a !== void 0 ? _a : "em") + ">";
                    const tagEnd = "</" + ((_b = options.highlightTag) !== null && _b !== void 0 ? _b : "em") + ">";
                    let highlightedTerm = initialValue.substring(startOffset, endOffset);
                    let newValue = initialValue.substring(0, startOffset) + tagStart + highlightedTerm + tagEnd + initialValue.substring(endOffset);
                    highlightOffset += (tagStart + tagEnd).length;
                    _set(item[options.fusejsHighlightKey || "_"], key, newValue);
                }
            }
            return item;
        });
    }
}
FusejsService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZWpzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZnVzZWpzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEtBQUssSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUdoQyxPQUFPLEVBQUMsR0FBRyxJQUFJLElBQUksRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUMsR0FBRyxJQUFJLElBQUksRUFBQyxNQUFNLFdBQVcsQ0FBQztBQWF0QyxNQUFNLE9BQU8sYUFBYTtJQUQxQjtRQUVVLG1CQUFjLEdBQTRCO1lBQ2hELGdCQUFnQixFQUFFLElBQUk7WUFDdEIsVUFBVSxFQUFFLEtBQUs7WUFDakIsU0FBUyxFQUFFLEdBQUc7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxHQUFHO1lBQ2IsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixrQkFBa0IsRUFBRSxDQUFDO1lBQ3JCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLG1CQUFtQixFQUFFLENBQUM7WUFDdEIsa0JBQWtCLEVBQUUsbUJBQW1CO1lBQ3ZDLGNBQWMsRUFBRSxhQUFhO1NBQzlCLENBQUM7SUErRUosQ0FBQztJQTdFQyxVQUFVLENBQUMsSUFBYyxFQUFFLFdBQW1CLEVBQUUsVUFBbUMsRUFBRTtRQUNuRix3R0FBd0c7UUFDeEcsb0VBQW9FO1FBQ3BFLE1BQU0sV0FBVyxHQUFrQyxNQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BHLElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQztRQUVwQixJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsbUJBQW1CLEtBQUksQ0FBQyxD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dWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEZ1c2UgZnJvbSAnZnVzZS5qcyc7XG5pbXBvcnQge0Z1c2VPcHRpb25zfSBmcm9tICdmdXNlLmpzJ1xuXG5pbXBvcnQge3NldCBhcyBfc2V0fSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IHtnZXQgYXMgX2dldH0gZnJvbSAnbG9kYXNoLWVzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEFuZ3VsYXJGdXNlanNPcHRpb25zPFQ+IGV4dGVuZHMgRnVzZU9wdGlvbnM8VD4ge1xuICBzdXBwb3J0SGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgZnVzZWpzSGlnaGxpZ2h0S2V5Pzogc3RyaW5nO1xuICBmdXNlanNTY29yZUtleT86IHN0cmluZztcbiAgbWluU2VhcmNoVGVybUxlbmd0aD86IG51bWJlcjsgLy8gPSAwO1xuICBtYXhpbXVtU2NvcmU/OiBudW1iZXI7XG4gIGhpZ2hsaWdodFRhZz86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZ1c2Vqc1NlcnZpY2U8VD4ge1xuICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBBbmd1bGFyRnVzZWpzT3B0aW9uczxUPiA9IHtcbiAgICBzdXBwb3J0SGlnaGxpZ2h0OiB0cnVlLFxuICAgIHNob3VsZFNvcnQ6IGZhbHNlLFxuICAgIHRocmVzaG9sZDogMC42LFxuICAgIGxvY2F0aW9uOiAwLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgbWF4UGF0dGVybkxlbmd0aDogMzIsXG4gICAgbWluTWF0Y2hDaGFyTGVuZ3RoOiAyLFxuICAgIGluY2x1ZGVTY29yZTogdHJ1ZSxcbiAgICBtaW5TZWFyY2hUZXJtTGVuZ3RoOiAzLFxuICAgIGZ1c2Vqc0hpZ2hsaWdodEtleTogJ2Z1c2VKc0hpZ2hsaWdodGVkJyxcbiAgICBmdXNlanNTY29yZUtleTogJ2Z1c2VKc1Njb3JlJyxcbiAgfTtcblxuICBzZWFyY2hMaXN0KGxpc3Q6IEFycmF5PFQ+LCBzZWFyY2hUZXJtczogc3RyaW5nLCBvcHRpb25zOiBBbmd1bGFyRnVzZWpzT3B0aW9uczxUPiA9IHt9KSB7XG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU5NTkzNzIvcHJvcGVydHktYXNzaWduLWRvZXMtbm90LWV4aXN0LW9uLXR5cGUtb2JqZWN0Y29uc3RydWN0b3JcbiAgICAvLyBUT0RPIDogcmVtb3ZlICg8YW55Pk9iamVjdCkgaGFjayBieSB1c2luZyByaWdodCBsaWIgb3IgcG9seWZpbGwgP1xuICAgIGNvbnN0IGZ1c2VPcHRpb25zOiBBbmd1bGFyRnVzZWpzT3B0aW9uczxUPiA9ICg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0OmFueSA9IFtdO1xuXG4gICAgaWYgKHNlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA+PSAoZnVzZU9wdGlvbnM/Lm1pblNlYXJjaFRlcm1MZW5ndGggfHwgMCkpIHtcbiAgICAgIGlmIChmdXNlT3B0aW9ucy5zdXBwb3J0SGlnaGxpZ2h0KSB7XG4gICAgICAgIGZ1c2VPcHRpb25zLmluY2x1ZGVNYXRjaGVzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IGZ1c2UgPSBuZXcgRnVzZShsaXN0LCBmdXNlT3B0aW9ucyk7XG4gICAgICByZXN1bHQgPSBmdXNlLnNlYXJjaChzZWFyY2hUZXJtcyk7XG4gICAgICBpZiAoZnVzZU9wdGlvbnMuc3VwcG9ydEhpZ2hsaWdodCkge1xuICAgICAgICByZXN1bHQgPSB0aGlzLmhhbmRsZUhpZ2hsaWdodChyZXN1bHQsIGZ1c2VPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5kZWVwQ2xvbmUobGlzdCk7XG5cbiAgICAgIGlmIChmdXNlT3B0aW9ucy5zdXBwb3J0SGlnaGxpZ2h0KSB7XG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgZWxlbWVudFtmdXNlT3B0aW9ucy5mdXNlanNIaWdobGlnaHRLZXkgfHwgJ18nXSA9IHRoaXMuZGVlcENsb25lKGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBkZWVwQ2xvbmUobykge1xuICAgIHZhciBfb3V0LCB2LCBfa2V5O1xuICAgIF9vdXQgPSBBcnJheS5pc0FycmF5KG8pID8gW10gOiB7fTtcbiAgICBmb3IgKF9rZXkgaW4gbykge1xuICAgICAgdiA9IG9bX2tleV07XG4gICAgICBfb3V0W19rZXldID0gKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiKSA/IHRoaXMuZGVlcENsb25lKHYpIDogdjtcbiAgICB9XG4gICAgcmV0dXJuIF9vdXQ7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUhpZ2hsaWdodChyZXN1bHQsIG9wdGlvbnM6IEFuZ3VsYXJGdXNlanNPcHRpb25zPFQ+KSB7XG4gICAgaWYgKG9wdGlvbnMubWF4aW11bVNjb3JlICYmIG9wdGlvbnMuaW5jbHVkZVNjb3JlKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKChtYXRjaE9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gbWF0Y2hPYmplY3Quc2NvcmUgPD0gKG9wdGlvbnMubWF4aW11bVNjb3JlfHwwKTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdC5tYXAoKG1hdGNoT2JqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5kZWVwQ2xvbmUobWF0Y2hPYmplY3QuaXRlbSk7XG4gICAgICBpdGVtW29wdGlvbnMuZnVzZWpzSGlnaGxpZ2h0S2V5IHx8IFwiX1wiXSA9IHRoaXMuZGVlcENsb25lKGl0ZW0pO1xuICAgICAgaXRlbVtvcHRpb25zLmZ1c2Vqc1Njb3JlS2V5IHx8IFwiX1wiXSA9IG1hdGNoT2JqZWN0LnNjb3JlO1xuICAgICAgZm9yIChsZXQgbWF0Y2ggb2YgbWF0Y2hPYmplY3QubWF0Y2hlcykge1xuICAgICAgICBjb25zdCBpbmRpY2VzOiBudW1iZXJbXVtdID0gbWF0Y2guaW5kaWNlcztcblxuICAgICAgICBsZXQgaGlnaGxpZ2h0T2Zmc2V0OiBudW1iZXIgPSAwO1xuXG4gICAgICAgIGxldCBrZXk6IHN0cmluZyA9IG1hdGNoLmtleTtcbiAgICAgICAgaWYoX2dldChpdGVtW29wdGlvbnMuZnVzZWpzSGlnaGxpZ2h0S2V5IHx8IFwiX1wiXSwga2V5KS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICBrZXkgKz0gYFske21hdGNoLmFycmF5SW5kZXh9XWBcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGluZGljZSBvZiBpbmRpY2VzKSB7XG4gICAgICAgICAgbGV0IGluaXRpYWxWYWx1ZTogc3RyaW5nID0gX2dldChpdGVtW29wdGlvbnMuZnVzZWpzSGlnaGxpZ2h0S2V5IHx8IFwiX1wiXSwga2V5KSBhcyBzdHJpbmc7XG5cbiAgICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IGluZGljZVswXSArIGhpZ2hsaWdodE9mZnNldDtcbiAgICAgICAgICBjb25zdCBlbmRPZmZzZXQgPSBpbmRpY2VbMV0gKyBoaWdobGlnaHRPZmZzZXQgKyAxO1xuICAgICAgICAgIGNvbnN0IHRhZ1N0YXJ0ID0gXCI8XCIgKyAob3B0aW9ucy5oaWdobGlnaHRUYWcgPz8gXCJlbVwiKSArIFwiPlwiO1xuICAgICAgICAgIGNvbnN0IHRhZ0VuZCA9IFwiPC9cIiArIChvcHRpb25zLmhpZ2hsaWdodFRhZyA/PyBcImVtXCIpICsgXCI+XCI7XG4gICAgICAgICAgbGV0IGhpZ2hsaWdodGVkVGVybSA9IGluaXRpYWxWYWx1ZS5zdWJzdHJpbmcoc3RhcnRPZmZzZXQsIGVuZE9mZnNldCk7XG4gICAgICAgICAgbGV0IG5ld1ZhbHVlID0gaW5pdGlhbFZhbHVlLnN1YnN0cmluZygwLCBzdGFydE9mZnNldCkgKyB0YWdTdGFydCArIGhpZ2hsaWdodGVkVGVybSArIHRhZ0VuZCArIGluaXRpYWxWYWx1ZS5zdWJzdHJpbmcoZW5kT2Zmc2V0KTtcbiAgICAgICAgICBoaWdobGlnaHRPZmZzZXQgKz0gKHRhZ1N0YXJ0ICsgdGFnRW5kKS5sZW5ndGg7XG4gICAgICAgICAgX3NldChpdGVtW29wdGlvbnMuZnVzZWpzSGlnaGxpZ2h0S2V5IHx8IFwiX1wiXSwga2V5LCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==