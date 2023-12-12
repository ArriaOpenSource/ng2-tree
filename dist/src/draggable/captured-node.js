export class CapturedNode {
    constructor(anElement, aTree) {
        this.anElement = anElement;
        this.aTree = aTree;
    }
    canBeDroppedAt(element) {
        return !this.sameAs(element) && !this.contains(element);
    }
    contains(other) {
        return this.element.nativeElement.contains(other.nativeElement);
    }
    sameAs(other) {
        return this.element === other;
    }
    get element() {
        return this.anElement;
    }
    get tree() {
        return this.aTree;
    }
}
//# sourceMappingURL=captured-node.js.map