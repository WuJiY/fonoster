/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos
 *
 * This file is part of Project Fonos
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {FonosService, ServiceOptions} from "@fonos/common";
import {AuthClient} from "../service/protos/auth_grpc_pb";
import AuthPB from "../service/protos/auth_pb";
import {promisifyAll} from "grpc-promise";
import grpc from "grpc";
import { CreateTokenRequest, ValidateTokenRequest } from "./types";

export default class Agents extends FonosService {

  constructor(options?: ServiceOptions) {
    super(AuthClient, options);
    super.init(grpc);
    promisifyAll(super.getService(), {metadata: super.getMeta()});
  }

  async createToken(request: CreateTokenRequest): Promise<any> {
    const req = new AuthPB.CreateTokenRequest();
    req.setAccessKeyId(request.accessKeyId);
    req.setRoleName(request.roleName);
    return super.getService().createToken().sendMessage(req);
  }

  async createNoAccessToken(request: CreateTokenRequest): Promise<any> {
    const req = new AuthPB.CreateTokenRequest();
    req.setAccessKeyId(request.accessKeyId);
    return super.getService().createToken().sendMessage(req);
  }

  async validateToken(request: ValidateTokenRequest): Promise<any> {
    const req = new AuthPB.ValidateTokenRequest();
    req.setToken(request.token);
    return super.getService().validateToken().sendMessage(req);
  }

}

export {AuthPB};
