import svgIcon from './svg-icon';
import optIcon from './opt-icon';

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg-icon/svg', false, /\.svg$/);
requireAll(req);

const globalComponents = {
    install: (Vue) => {
        Vue.component('svgIcon', svgIcon);
        Vue.component('optIcon', optIcon);
    }
};

export default globalComponents;
