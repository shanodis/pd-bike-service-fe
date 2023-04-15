import { useCurrentUser } from "../contexts/UserContext";
import { Roles } from "../enums/Roles";

const useRole = () => {
  const { currentUser } = useCurrentUser();
  const roleId = currentUser?.appUserRole

  return (...roles: Roles[]) => roles.includes(roleId as Roles);
}

export default useRole;
