import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from "@app/profile/profile.service";
import { Profile } from '@app/_models/profile';
import { Interests } from "@app/_models/interests";
import { Followers } from "@app/_models/followers";
import { UserPosts } from "@app/_models/userPosts";
import { OwnedChannels } from "@app/_models/ownedChannels";
import { SubscribedChannels } from "@app/_models/subscribedChannels";
import { SubscribedAmount } from "@app/_models/subscribedAmount"
import { Proxy } from './proxy-pattern/proxy'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.paymentProxy = new Proxy()
  }


  public profileData: Profile
  public interestsData: Interests
  public followersData: Followers
  public userPostsData: UserPosts
  public ownedChannelsData: OwnedChannels
  public subscribedChannelsData: SubscribedChannels
  public paymentAmount: SubscribedAmount
  public paymentProxy: Proxy

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const profileId = params['profileId'];
      this.loadProfileDetails(profileId);
      this.loadInterests(profileId);
      this.loadFollowers(profileId);
      this.loadUserPosts(profileId);
      this.loadOwnedChannels(profileId)
      this.loadSubscribedChannels(profileId)
      this.loadPaymentDetails(profileId)
    });
  }

  loadProfileDetails(profileId) {
    this.profileService.getProfileDetails(profileId).subscribe(
      response => {
        // console.log(response)
        this.profileData = response
      },
      err => {
        console.log(err)
      }
    )
  }

  loadInterests(profileId) {
    this.profileService.getInterests(profileId).subscribe(
      response => {
        // console.log(response)
        this.interestsData = response
      },
      err => {
        console.log(err)
      }
    )
  }

  loadFollowers(profileId) {
    this.profileService.getFollowers(profileId).subscribe(
      response => {
        // console.log(response)
        this.followersData = response
      },
      err => {
        console.log(err)
      }
    )
  }

  loadUserPosts(profileId) {
    this.profileService.getUserPosts(profileId).subscribe(
      response => {
        // console.log(response)
        this.userPostsData = response
      },
      err => {
        console.log(err)
      }
    )
  }

  loadOwnedChannels(profileId) {
    this.profileService.getOwnedChannels(profileId).subscribe(
      response => {
        console.log(response)
        this.ownedChannelsData = response
      },
      err => {
        console.log(err)
      }
    )
  }

  loadSubscribedChannels(profileId) {
    this.profileService.getSubscribedChannels(profileId).subscribe(
      response => {
        console.log(response)
        this.subscribedChannelsData = response
      },
      err => {
        console.log(err)
      }
    )
  }

  postDetails(pId) {
    this.router.navigate(['postCommentsPath'], { queryParams: { postId: pId } })
  }

  loadPaymentDetails(pId) {
    this.profileService.getPaymentDetails(pId).subscribe(
      response => {
        this.paymentAmount = response
      },
      err => {
        console.log(err)
      }
    )
  }

  performPayment() {
    this.paymentProxy.performTransaction(this.paymentAmount)

    this._snackBar.open("Payment Performed for $" + (this.paymentAmount.amount + this.paymentAmount.tax).toFixed(2), "Okay", {
      duration: 2000,
    });

    // communicate payment to the server 

  }
}
