export class Citation {
    citation_id?: number;
    driver_id?: number;
    user_id?: number;
    type = "";
    date = new Date(); // May need to change this!
    time = Date;
    owner_fault = Boolean;
    desc = "";
    violation_loc = "";
    sign_date = Date;
    vin = "";
    vin_state = "";
    code_section = "";
    officer_name = "";
    officer_badge = "";
}