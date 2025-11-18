// This file simulates API calls to a backend service.
// In a real application, this would use fetch or axios to make real HTTP requests.

/**
 * Simulates sending an OTP to a mobile number.
 * @param mobile The mobile number to send the OTP to.
 * @returns A promise that resolves to true if successful, false otherwise.
 */
export const sendOtp = (mobile: string): Promise<boolean> => {
    console.log(`[API MOCK] Sending OTP to ${mobile}`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`[API MOCK] OTP sent successfully.`);
            resolve(true);
        }, 1500); // Simulate network delay
    });
};

/**
 * Simulates verifying an OTP.
 * @param mobile The mobile number.
 * @param otp The 6-digit OTP.
 * @returns A promise that resolves to true if OTP is valid, false otherwise.
 */
export const verifyOtp = (mobile: string, otp: string): Promise<boolean> => {
    console.log(`[API MOCK] Verifying OTP ${otp} for ${mobile}`);
    return new Promise(resolve => {
        setTimeout(() => {
            // In a real app, you'd check the OTP. Here, we'll accept any 6-digit code.
            const isValid = /^\d{6}$/.test(otp);
            console.log(`[API MOCK] OTP verification result: ${isValid}`);
            resolve(isValid);
        }, 1500);
    });
};

/**
 * Simulates looking up an address from a postal code.
 * @param postalCode The 10-digit postal code.
 * @returns A promise that resolves with the address information or null on failure.
 */
export const lookupPostalCode = (postalCode: string): Promise<{ address: string } | null> => {
    console.log(`[API MOCK] Looking up postal code ${postalCode}`);
    return new Promise(resolve => {
        setTimeout(() => {
            if (/^\d{10}$/.test(postalCode)) {
                const mockAddress = `تهران، خیابان آزادی، پلاک ${postalCode.slice(-3)}، واحد ${postalCode.slice(0, 2)}`;
                console.log(`[API MOCK] Found address: ${mockAddress}`);
                resolve({ address: mockAddress });
            } else {
                console.log(`[API MOCK] Invalid postal code.`);
                resolve(null);
            }
        }, 2000);
    });
};
