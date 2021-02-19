export const getRedirectTo = (type, header) => {
    let path = "";
    if (type === "boss") {
        path = "/boss";
    } else {
        path = "/expert";
    }
    if (!header) {
        path += "info"
    }
    return path;
}