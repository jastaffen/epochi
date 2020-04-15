export const formatMonth = () => {
    const months = ['January', "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const d = new Date();
    return months[d.getMonth()];
}
