const SESSION_FLAG = "qc.hasSession";
let accessToken = null;

export const getAccessToken = () => accessToken;
export const hasSession = () => localStorage.getItem(SESSION_FLAG) === "1";

export function saveSession(data)
{
    accessToken = data.accessToken;
    localStorage.setItem(SESSION_FLAG, 1);

    return accessToken;
}

export function clearSession()
{
  accessToken = null;
  localStorage.removeItem(SESSION_FLAG);
}