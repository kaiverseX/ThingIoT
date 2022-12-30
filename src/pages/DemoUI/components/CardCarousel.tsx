import {Card, Button} from '@mantine/core';
import CarouselFull from '~/components/CarouselFull';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
];

const CarouselCard = () => {
  return (
    <Card className="group card-primary">
      <Card.Section>
        <CarouselFull images={images} imageProps={{height: '12rem'}} />
      </Card.Section>

      <div className="flex-center-between mt-4 font-semibold">
        <span className="text-lg">Smart home devices</span>
        <span className="text-sm">⭐ 4.78</span>
      </div>

      <p className="text-sm text-slate-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut neque repudiandae, quod, officia
        incidunt error vero accusantium, ratione maxime voluptatibus quia officiis. Laborum
        quisquam, libero delectus tempora sit eligendi modi?
      </p>

      <div className="flex-center-between mt-4">
        <div>
          <span className="text-xl font-semibold">399$</span>
          <span className="text-sm text-slate-500"> / part</span>
        </div>

        <Button radius="md">Purchase</Button>
      </div>
    </Card>
  );
};

export default CarouselCard;
