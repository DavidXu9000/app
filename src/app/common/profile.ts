export interface Profile {
    family_name: string,
    given_name: string,
    user_id: string,
    user_metadata: {
        picture: string
    },
    email: string;
}
