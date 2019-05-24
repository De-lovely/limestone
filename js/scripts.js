let firstName = document.querySelector('#contact-first-name');
let lastName = document.querySelector('#contact-last-name');
let company = document.querySelector('#contact-company');
let email = document.querySelector('#contact-email');
let contactMessage = document.querySelector('#contact-message');
let button = document.querySelector('#contact-submit');
let contactFrom = document.querySelector('.contact-form');
let form = document.querySelector('form');

button.addEventListener('click', function () {
   if (firstName.value.length < 3) {
       document.querySelector('.first-name').classList.add('error');
       return false;
   } else {
       document.querySelector('.first-name').classList.remove('error');
   }

    if (lastName.value.length < 3) {
        document.querySelector('.last-name').classList.add('error');
        return false;
    } else {
        document.querySelector('.last-name').classList.remove('error');
    }

    if (company.value.length < 3) {
        document.querySelector('.company').classList.add('error');
        return false;
    } else {
        document.querySelector('.company').classList.remove('error');
    }

    let emailMatch = email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);

    if (!emailMatch) {
        document.querySelector('.email').classList.add('error');
        return false;
    } else {
        document.querySelector('.email').classList.remove('error');

        getArray();
    }

    if (contactMessage.value.length < 3) {
        document.querySelector('.message').classList.add('error');
        return false;
    } else {
        document.querySelector('.message').classList.remove('error');
    }
});

form.addEventListener("submit", function() {
    contactFrom.classList.add('sent');
    event.preventDefault();

    document.querySelector('.contact-form h3').innerHTML = 'Success!';
    form.remove();
    let p = document.createElement("P");
    let text = document.createTextNode("Thank You For Your Inquiry! Our team will be in touch soon.");
    p.appendChild(text);
    contactFrom.appendChild(p);

    let homeLink = document.createElement('a');
    homeLink.setAttribute('class', 'home');
    homeLink.setAttribute('href', '#');
    homeLink.innerHTML = 'Home';
    contactFrom.appendChild(homeLink);
});

function getArray() {
    let request =  new XMLHttpRequest();

    request.addEventListener('readystatechange', function(){
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);

            for (let i = 0; i < data.length; i++ ) {
                if (data[i] === email.value) {
                    let warning = document.createElement('p');
                    let warningText = document.createTextNode('This email is already exists');


                    warning.appendChild(warningText);
                    document.querySelector('.email').appendChild(warning);
                    document.querySelector('.email').classList.add('error');

                    return false;

                } else {
                    document.querySelector('.email > p').remove();
                }
            }
        }
    });

    request.open('GET', 'check.php', true);
    request.send();
}
