/**
 * Returns a mock bank name based on the bank code in a SHEBA number.
 * @param sheba The SHEBA identifier string.
 * @returns The name of the bank or a default string.
 */
export const getBankNameFromSheba = (sheba: string): string => {
    if (typeof sheba !== 'string' || (!sheba.startsWith('IR') && sheba.length < 5)) {
        // Simple validation for card numbers or invalid inputs
        const isCardNumber = /^\d{16}$/.test(sheba);
        if (isCardNumber) {
            // In a real scenario, you'd have a mapping for card BINs
            return 'بانک (از شماره کارت)';
        }
        return 'نامشخص';
    }
    
    const bankCode = sheba.substring(4, 7);
    const banks: { [key: string]: string } = {
        '017': 'بانک ملی',
        '012': 'بانک ملت',
        '018': 'بانک تجارت',
        '054': 'بانک پارسیان',
        '057': 'بانک پاسارگاد',
        '055': 'بانک اقتصاد نوین',
        '021': 'پست بانک ایران',
    };
    return banks[bankCode] || 'سایر بانک‌ها';
};
