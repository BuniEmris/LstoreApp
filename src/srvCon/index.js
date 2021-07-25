export const getResource = async (addr, login) => {
  try {
    let res = await fetch(
      'https://srv.lavina.uz/Storetest/test/hs/app/' + addr,
      {
        method: 'GET',
        headers: {
          Authorization: login,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (!res.ok) {
      console.log(res);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return 123;
  }
};
