export const formatChefBody = chef => {
    const { firstName, lastName, bio, avatar } = chef;
    return {
        name: `${firstName.trim()} ${lastName.trim()}`,
        bio,
        avatar
    }
}