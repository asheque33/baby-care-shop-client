import RegisterComponent from "@/components/Register/RegisterComponent";
import Container from "@/components/Shared/Container/Container";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Container className="h-screen flex items-center justify-center">
      <div
        id="register-content"
        className="bg-[#F5EFE6] flex justify-center items-center  w-4/5 md:w-3/5 lg:w-2/5  p-3.5 rounded-xl"
      >
        <div className="flex flex-col items-center w-full">
          <section className="text-center mb-4">
            <h1 className="mb-1.5 text-xl md:text-3xl lg:text-4xl font-semibold text-blue-500/80">
              Register!!
            </h1>
            <p className="ms-4 italic text-slate-600/75 text-sm">
              Create an account to enjoy all the benefits.
            </p>
          </section>
          <RegisterComponent />
          <p className="py-1.5">
            Already have an account?{" "}
            <Link
              className="text-blue-500/80 font-semibold text-lg"
              href={`/login`}
            >
              Login
            </Link>{" "}
            Please!
          </p>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
