import { Citation } from "./citation";
import { Driver } from "./driver";
import { Violation } from "./violation";

export class CompleteCitation {
    citation = new Citation();
    violations: Violation[] = [];
    driver = new Driver();
}