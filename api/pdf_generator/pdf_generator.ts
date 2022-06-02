import Login from '../models/login'

export default async function Generar() {
    //Required package
    let pdf = require("pdf-creator-node");
    let fs = require("fs");

    // Read HTML Template
    let html = fs.readFileSync(".\\api\\pdf_generator\\pdf_model.html", "utf8");

    let options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        // header: {
        //     height: "45mm",
        //     contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        // },
        // footer: {
        //     height: "28mm",
        //     contents: {
        //         first: 'Cover page',
        //         2: 'Second page', // Any page number is working. 1-based index
        //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        //         last: 'Last Page'
        //     }
        // }
    };

    const users = await Login.find()
    const arrayUsers : any[] = []
    users.forEach(d => {
        const u = {
            name: d.name,
            username: d.username,
            surname: d.surname
        }
        arrayUsers.push(u);
    });

    console.log(arrayUsers)

    let pdf_document = {
        html: html,
        data: {
            users: arrayUsers
        },
        path: ".\\public\\pdf\\outputPDF.pdf",
        type: "",
    };

    let miPrimeraPromise = new Promise((resolve, reject) => {
        pdf.create(pdf_document, options)
    });
    miPrimeraPromise.then((successMessage) => {
        console.log(successMessage);
    });
    miPrimeraPromise.catch((error) => {
        console.error(error);
    });

    let crearPdfPromise = await Promise.all([users, miPrimeraPromise]).then((e) => { return e })

    return crearPdfPromise;
}