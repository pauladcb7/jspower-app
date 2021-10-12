import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  function logout() {
    dispatch({
      type: "LOG_OUT",
    });
  }
  const user = useSelector((state) => {
    return state.user;
  });
  const fullName =
    user.first_name && user.last_name
      ? user.first_name + " " + user.last_name
      : user?.email
          ?.split("@")
          .shift()
          .split(".")
          .map((i) => {
            return i.charAt(0).toUpperCase() + i.slice(1) + " ";
          })
          .toString()
          .replace(",", "")
          .trim() || user.email;

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/profile_photo.png"}
            className="c-avatar-img"
            alt={user.email}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>{fullName}</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem> */}
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
