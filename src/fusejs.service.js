"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusejsService = void 0;
const core_1 = require("@angular/core");
const fuse_js_1 = __importDefault(require("fuse.js"));
const _set = require("lodash.set");
const _get = require("lodash.get");
let FusejsService = class FusejsService {
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
            let fuse = new fuse_js_1.default(list, fuseOptions);
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
};
FusejsService = __decorate([
    core_1.Injectable()
], FusejsService);
exports.FusejsService = FusejsService;
