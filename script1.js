console.log("Script loaded successfully.");

async function main()
{
    let a = await fetch("http://127.0.0.1:3000/songs")
    let response = await a.text();
    console.log(response);
    let div= document.createElement("div");
    div.innerHTML = response;
    let as=div.getElementsByTagName("a");
    console.log(as);
    console.log(as.length);
}
main();