"use client";

enum MODE {
  LOGIN = "登录",
  REGISTER = "注册",
  RESET_PASSWORD = "重置密码",
  EMAIL_VERIFICATION = "验证邮箱",
}

import useWixClient from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";

export default function LoginPage() {
  const wixClient = useWixClient();

  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  console.log(isLoggedIn);

  if (isLoggedIn) {
    router.push("/");
  }

  const [mode, setMode] = React.useState(MODE.LOGIN);

  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [email, setEmail] = React.useState("");

  const [emailCode, setEmailCode] = React.useState("");

  const [isLoding, setIsLoading] = React.useState(false);

  const [error, setError] = React.useState("");

  const [message, setMessage] = React.useState("");

  const pathName = usePathname();

  const formTitle =
    mode === MODE.LOGIN
      ? "登录"
      : mode === MODE.REGISTER
      ? "注册"
      : mode === MODE.RESET_PASSWORD
      ? "重置密码"
      : "验证邮箱";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "登录"
      : mode === MODE.REGISTER
      ? "注册"
      : mode === MODE.RESET_PASSWORD
      ? "重置"
      : "验证";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let response;

    try {
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
          );
          setMessage("密码重置链接已发送到您的邮箱，请查收");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      console.log(response);

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("成功");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          console.log(tokens);

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("邮箱或密码错误");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("邮箱已存在");
          } else if (response.errorCode === "resetPassword") {
            setError("重置密码失败");
          } else {
            setError("发生错误，请稍后再试");
          }
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("等待管理员审核");
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError("发生错误，请稍后再试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <form action="" className=" flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className=" text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className=" flex flex-col gap-8">
            <label htmlFor="username" className=" text-sm to-gray-700">
              用户名
            </label>
            <input
              type="text"
              name="username"
              placeholder="用户名"
              className=" ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        ) : null}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className=" flex flex-col gap-8">
            <label htmlFor="email" className=" text-sm to-gray-700">
              邮箱
            </label>
            <input
              type="email"
              name="email"
              placeholder="电子邮箱"
              className=" ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        ) : (
          <div className=" flex flex-col gap-8">
            <label htmlFor="email" className=" text-sm to-gray-700">
              验证码
            </label>
            <input
              type="text"
              name="emailCode"
              placeholder="验证码"
              className=" ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => {
                setEmailCode(e.target.value);
              }}
            />
          </div>
        )}

        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className=" flex flex-col gap-8">
            <label htmlFor="password" className=" text-sm to-gray-700">
              密码
            </label>
            <input
              type="password"
              name="password"
              placeholder="密码"
              className=" ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        ) : null}

        {mode === MODE.LOGIN && (
          <div
            className=" text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.RESET_PASSWORD);
            }}
          >
            忘记密码
          </div>
        )}

        <button
          disabled={isLoding}
          className=" bg-red-400 text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        >
          {isLoding ? "loding..." : buttonTitle}
        </button>
        {error && <div className=" text-red-600"> {error}</div>}

        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.REGISTER);
            }}
          >
            注册账号
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN);
            }}
          >
            以有账号
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN);
            }}
          >
            返回登录
          </div>
        )}
        {message && <div className=" text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
}
