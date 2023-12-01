export default interface User { 
    image: string | null; 
    email: string; 
    name: string | null; 
    id: string; 
    emailVerified: Date | null; 
}