export const BACKEND ={
    BASE_URL: 'http://195.200.15.181:5001',
    headers:{
        accept: 'application/json',
    }
}

export const fetchGetAllJenisMangrove = async () => {
  const endpoint = `${BACKEND.BASE_URL}/mangrove/get-data`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: BACKEND.headers,
  });

  if (!response.ok) {
    
    throw new Error('Failed to fetch mangrove');
  }

  const data = await response.json();

  return data;
};
