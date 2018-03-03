import {AbstractControl} from '@angular/forms';
export class Validation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let passwordconf = AC.get('passwordconf').value; // to get value in input tag
        if(password != passwordconf) {
            console.log('false');
            AC.get('password.conf').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}
