export const getFirstName = (name?: string | null) => {
  if (name) {
    return name.split(' ')[0];
  }
  return '';
};

export const generateUid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaa'
  return `${s4() + s4()}-${s4()}${s4()}${s4()}${s4()}`;
};

export const mapErrorCodeToMessage = (erroCode: string) => {
  switch (erroCode) {
    case 'auth/invalid-password':
      return 'La contraseña es incorrecta';

    case 'auth/invalid-login-credentials':
      return 'El correo o la contraseña son incorrectos';

    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos, intente más tarde';

    case 'auth/invalid-email':
      return 'Correo electrónico no válido';

    case 'auth/user-disabled':
      return 'El usuario está deshabilitado';

    case 'auth/wrong-password':
      return 'La contraseña o el correo no son válidos';

    case 'auth/user-not-found':
      return 'La contraseña o el correo no son válidos';

    case 'permission-denied':
      return 'No tienes permisos para realizar esta acción';

    default:
      return `Código de error: ${erroCode}`;
  }
};
const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const get12HourTime = (date: any) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const newformat = hours >= 12 ? 'PM' : 'AM';
  let hours2 = hours % 12;
  hours2 = hours2 ? hours2 : 12; // the hour '0' should be '12'
  const minutes2 = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${hours2}:${minutes2} ${newformat}`;
  return formattedTime;
};

const getFormattedDate = (
  date: any,
  prefomattedDate = false,
  hideYear = false,
) => {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hour = get12HourTime(date);
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    // Today, 10:20
    // Yesterday, 10:20
    return `${prefomattedDate}, ${hour}`;
  }

  if (hideYear) {
    // Enero 10, 10:20
    return ` ${month} ${day}, ${hour}`;
  }

  //Enero 10 de 2017, 10:20
  return `${month} ${day} de ${year}, at ${hour}`;
};

// --- Main function
export const timeAgo = (dateParam: any) => {
  if (!dateParam) {
    return null;
  }

  const date =
    typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date((today as any) - DAY_IN_MS);
  const seconds = Math.round(((today as any) - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday =
    yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 90) {
    return 'Justo Ahora';
  } else if (minutes < 60) {
    return `Hace ${minutes} minutos`;
  } else if (isToday) {
    return getFormattedDate(date, 'Hoy' as any); // Hoy, 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Ayer' as any); // Yesterday,  10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. Enero,  10:20
  }

  return getFormattedDate(date); // 10. January 2017. 10:20
};
