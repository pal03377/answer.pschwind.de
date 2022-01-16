import { unjumbleName } from "./jumbleName";


export default function getName() {
    if (location.hash) {
        return location.hash.slice(1);
    } else if (location.search) {
        return unjumbleName(location.search.slice(1));
    } else {
        return "human";
    }
}