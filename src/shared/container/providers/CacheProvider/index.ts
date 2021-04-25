import { container } from "tsyringe";

import { RedisCacheProvider } from "@shared/container/providers/CacheProvider/implementations/RedisCacheProviders";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/ICacheProvider";

const providers = {
  redis: RedisCacheProvider
}
container.registerSingleton<ICacheProvider>(
  "CacheProvider",
  providers.redis,
);
