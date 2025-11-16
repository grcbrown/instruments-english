function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.text = json_object[i].text;
        obj.data = {};
        obj.data.text = json_object[i].text;
        obj.data.id = json_object[i].id;
        obj.data.subj = json_object[i].subj;
        obj.data.mobile = json_object[i].mobile;
        obj.data.sentient = json_object[i].sentient;
        obj.data.volition = json_object[i].volition;
        obj.data.instigation = json_object[i].instigation;
        obj.data.qualpersist = json_object[i].qualpersist;
        tv_array.push(obj)
    }
    return tv_array;
}