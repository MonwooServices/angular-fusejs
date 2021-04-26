import { FuseOptions } from 'fuse.js';
export interface AngularFusejsOptions<T> extends FuseOptions<T> {
    supportHighlight?: boolean;
    fusejsHighlightKey?: string;
    fusejsScoreKey?: string;
    minSearchTermLength?: number;
    maximumScore?: number;
    highlightTag?: string;
}
export declare class FusejsService<T> {
    private defaultOptions;
    searchList(list: Array<T>, searchTerms: string, options?: AngularFusejsOptions<T>): any;
    private deepClone;
    private handleHighlight;
}
//# sourceMappingURL=fusejs.service.d.ts.map