interface Inputs {
    email: string,
    password: string,
}

export function validation(inputs: Inputs) {
    const regExp = /[.-\w]+@(\w+\.)+[\w]+/g
    const emailTestResult = regExp.test(inputs.email)

    const regExpPassword = /.6+/
    const passwordTestResult = regExpPassword.test(inputs.password)

    return [emailTestResult, passwordTestResult]
}