import RegisterComponent from "@/components/Register/RegisterComponent";
import Container from "@/components/Shared/Container/Container";

const RegisterPage = () => {
  return (
    <Container className="bg-amber-100 my-8 flex flex-col w-3/5 mx-auto ">
      <section className="mb-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-blue-500">
          Register
        </h1>
        <p className="text-gray-500 text-sm">
          Create an account to enjoy all the benefits.
        </p>
      </section>
      <RegisterComponent />
    </Container>
  );
};

export default RegisterPage;
