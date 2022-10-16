import { Citation } from "../models/citation";

/**
 * Retrieves Response of GET METHOD for api/Citation/{pageNumber}/{pageSize}
 * using in pagination for material table
 */

export class CitationsResponse {
    citations: Citation[] = [];
    totalCitationsCount?: number;
    totalPages?: number;
    currentPage: number = 1;
}