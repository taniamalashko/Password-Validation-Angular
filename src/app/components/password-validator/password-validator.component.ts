import { Component } from '@angular/core';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.css']
})
export class PasswordValidatorComponent {
  password: string = ''; // User's input for the password
  confirmPassword: string = ''; // User's input for confirming the password
  passwordStrength: string = 'empty'; // Represents the strength of the password: 'empty', 'tooShort', 'easy', 'medium', 'strong'
  visibility: boolean = false; // Indicates whether the password input is in visible or hidden state
  passwordsMatch: boolean = true; // Indicates whether the entered password and confirmation password match

  // Function to check the validity and strength of the entered password
  checkIsPasswordValid() {
    const password = this.password;
    const passwordLength = password.length;

    // Regular expressions to check if the password is 'easy', 'medium', or 'strong'
    const isEasy = /^[a-zA-Z]+$|^[0-9]+$|^[!@#$%^&*]+$/.test(password);
    const isMedium = (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) ||
                    (/[a-zA-Z]/.test(password) && /[!@#$%^&*]/.test(password)) ||
                    (/[0-9]/.test(password) && /[!@#$%^&*]/.test(password));
    const isStrong = /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);

    // Determine the strength of the password based on the checks
    if (passwordLength === 0) {
      this.passwordStrength = 'empty';
    } else if (passwordLength < 8) {
      this.passwordStrength = 'tooShort';
    } else if (isStrong) {
      this.passwordStrength = 'strong';
    } else if (isMedium) {
      this.passwordStrength = 'medium';
    } else if (isEasy) {
      this.passwordStrength = 'easy';
    }
  }

  // Function to get the background color for password strength circles based on their index
  getColor(circleIndex: number) {
    return {
      'background-color': this.getColorByStrength(circleIndex)
    };
  }

  // Private function to get the color for a specific password strength circle based on the current password strength
  private getColorByStrength(circleIndex: number): string {
    switch (this.passwordStrength) {
      case 'tooShort':
        return 'red';
      case 'easy':
        return circleIndex === 0 ? 'red' : 'gray';
      case 'medium':
        return circleIndex <= 1 ? 'yellow' : 'gray';
      case 'strong':
        return circleIndex <= 2 ? 'green' : 'gray';
      default:
        return 'gray';
    }
  }

  // Function to toggle the visibility of the password input
  togglePasswordVisibility() {
    this.visibility = !this.visibility;
  }

  // Function to check if the entered password and confirmation password match
  checkPasswordsMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }
}
