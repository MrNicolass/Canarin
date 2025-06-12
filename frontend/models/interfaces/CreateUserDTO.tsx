interface CreateUserDto {
    login: string;
    password: string;
    person: {
        name: string;
        lastName: string;
        cpf: string;
        phones: {
            cellPhone: string;
        }
    };
}

export default CreateUserDto;