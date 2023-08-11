import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "age", async: false })
export class AgeValidation implements ValidatorConstraintInterface {
  validate(dateOfBirth: Date, args: ValidationArguments) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 5) {
      return false;
    }

    if (age === 5) {
      const currentMonth = today.getMonth();
      const birthMonth = birthDate.getMonth();
      if (currentMonth < birthMonth) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Date of birth must be >= 5.";
  }
}
