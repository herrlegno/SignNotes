import moment from 'moment';
import 'moment/locale/es';

const lang = navigator.languages[0] || navigator.language;

moment.locale(lang);

export default moment;
