import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class SafeHtmlPipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: string): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDef<SafeHtmlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<SafeHtmlPipe, "safeHtml">;
}
