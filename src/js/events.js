import { loadHeaderFooter, getParams } from "./utils.mjs";
import Calendar from "./Calendar.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();

const cal = new Calendar(category, dataSource);

cal.init();
