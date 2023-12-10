import { loadHeaderFooter } from "./utils.mjs";
import Calendar from "./Calendar.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();

const cal = new Calendar(dataSource);

cal.init();
