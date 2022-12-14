import { CompleteCitation } from "../models/complete-citation";

/**
 * Retrieves Response of GET METHOD for api/Citation/{pageNumber}/{pageSize}
 * using in pagination for material table
 */

export class CitationsResponse {
    completeCitation: CompleteCitation[] = [];
    totalCitationsCount?: number;
    totalPages?: number;
    currentPage: number = 1;
}