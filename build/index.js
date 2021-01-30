import superAgent from "superagent";
const test = () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    superAgent.get(url).then((res) => {
        console.log(res);
    });
};
test();
