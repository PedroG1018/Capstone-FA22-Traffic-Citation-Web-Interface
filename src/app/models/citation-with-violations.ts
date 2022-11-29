import { Citation } from "./citation";
import { Violation } from "./violation";

export class CitationWithViolations {
    citation?: Citation;
    violations?: Violation[] = [];
}