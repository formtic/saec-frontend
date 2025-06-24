export function validateSimpleString(rule, value) {
    if(!value || value.trim() === '' ) return new Error('Este campo es obligatorio');
}