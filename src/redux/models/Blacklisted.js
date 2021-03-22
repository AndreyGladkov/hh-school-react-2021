const CHANGE_BLACKLISTED = 'CHANGE_BLACKLISTED';

export function changeBlacklisted(usersData) {
  return {
    type: CHANGE_BLACKLISTED,
    blacklisted: usersData,
  };
}

export default function Blacklisted(state = null, { type, blacklisted }) {
  switch (type) {
    case CHANGE_BLACKLISTED:
      return blacklisted;
    default:
      return state;
  }
}
