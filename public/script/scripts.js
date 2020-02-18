/**/
document 
    .querySelector('header button')
    .addEventListener("click", function(){ /*CASO O BOTÃO SEJA CLICADO A FUNÇÃO SUMIRÁ COM O FORM*/
        document
            .querySelector('.form')
            .classList.toggle('hide') /*(hide) TIRA SE TIVER, E PÕE CASO NÃO TENHA*/
    })