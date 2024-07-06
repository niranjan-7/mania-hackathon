// utils.tsx

import axios from "axios";

interface UserInfo {
  fullname: string;
  imageUrl: string;
}

export async function getUserInfo(email: string): Promise<any> {
  try {
    const response = await axios.post<{ data: UserInfo }>(`http://localhost:5000/api/users/check-email`, { email });
    // console.log('util', response.data); // Logging response data for verification
    return response.data;
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null; // Return null or handle error as per your application's needs
  }
}
