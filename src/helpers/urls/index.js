export const BASE = process.env.NODE_ENV === 'production' ? "/api" : "http://localhost:3000/api/";

export const LOG_IN = "login/";
export const TEST = "test/";

/* Time Cards */
export const CREATE_TIME_CARD = "time-card/create/";
export const JOB_LOCATIONS = "time-card-location/get/";
export const GET_TIME_CARD_BY_DAY = "time-card/getTimeCardByDay/";
export const CLOCK_IN = "time-card/clockIn/";
export const CLOCK_OUT = "time-card/clockOut/";
export const LUNCH_IN = "time-card/lunchIn/";
export const LUNCH_OUT = "time-card/lunchOut/";

/*  Work Orders */
export const SAVE_WORK_ORDER = "work-order/save/";
export const DELETE_WORK_ORDER = "work-order";



export const WORK_TYPES = "work-order/getWorkOrderTypes/";

/* Material Requisition */
export const MATERIAL_REQUISITION = "material-requisition";

/* Circuit Directory */
export const CIRCUIT_DIRECTORY = "circuit-directory";

/* Safety Sheets */
