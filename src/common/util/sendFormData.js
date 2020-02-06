const sendFormData = (url, params, target) => {
    const tempform = document.createElement("form");
    tempform.action = url;
    tempform.method = "post";
    tempform.style.display="none"
    if (target) {
        tempform.target = target;
    }

    for (let x in params) {
        const opt = document.createElement("input");
        if (typeof params[x] === 'object') {
            for (let x1 in params[x]) {
                const opt1 = document.createElement("input");
                opt1.name = x+'[' + x1 + ']';
                opt1.value = params[x][x1];
                tempform.appendChild(opt1);
            }
        } else {
            opt.name = x;
            opt.value = params[x];
            tempform.appendChild(opt);
        }
    }  

    const opt = document.createElement("input");
    opt.type = "submit";
    tempform.appendChild(opt);
    document.body.appendChild(tempform);
    tempform.submit();
    document.body.removeChild(tempform);
};

export { sendFormData };