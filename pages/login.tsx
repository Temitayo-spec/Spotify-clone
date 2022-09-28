/* eslint-disable @next/next/no-img-element */
import { getProviders, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Login = ({ providers }: any) => {
  const router = useRouter();
  // useEffect should be used to redirect the user to the home page if they are already logged in
  
  useEffect(() => {
    const GetSession = async () => {
      const session = await getSession() as any;
      if (session) {
        router.replace("/");
      }
    };
    GetSession();
  }, [router]);
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider: any) => (
        <div key={provider?.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-lg mt-5 shadow-md hover:shadow-xl active:scale-90 transition duration-150 text-transform: uppercase font-medium"
            onClick={() => signIn(provider?.id, { callbackUrl: "/" })}
          >
            Login with {provider?.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
