import { Citation } from "../models/citation";
import { Driver } from "../models/driver";

/**
 * Retrieves Response of GET METHOD for api/Citation/{pageNumber}/{pageSize}
 * using in pagination for material table
 */

export class CitationsResponse {
    citations: Citation[] = [];
    drivers: Driver[] = [];
    totalCitationsCount?: number;
    totalPages?: number;
    currentPage: number = 1;
}