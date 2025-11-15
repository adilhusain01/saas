import DodoPayments from 'dodopayments';

let client: DodoPayments | null = null;

function getDodoClient() {
  if (!client) {
    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    console.log('Getting Dodo client, API key:', apiKey ? 'present' : 'missing');

    if (apiKey && apiKey.trim() !== '' && apiKey !== 'your-dodo-api-key') {
      console.log('Initializing Dodo client...');
      // Check if we're in test mode based on API key or environment
      const isTestMode = apiKey.startsWith('test_') || process.env.NODE_ENV === 'development';
      const baseURL = isTestMode ? 'https://test.dodopayments.com' : 'https://live.dodopayments.com';

      console.log('Using base URL:', baseURL, '(test mode:', isTestMode, ')');

      client = new DodoPayments({
        bearerToken: apiKey,
        baseURL: baseURL,
      });
      console.log('Dodo client initialized:', !!client);
    } else {
      console.log('Dodo client NOT initialized due to missing/invalid API key');
    }
  }
  return client;
}

export { getDodoClient as client };